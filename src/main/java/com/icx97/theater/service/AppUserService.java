package com.icx97.theater.service;

import com.icx97.theater.config.CustomUserDetails;
import com.icx97.theater.dto.AppUserDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.AppUserMapper;
import com.icx97.theater.model.AppUser;
import com.icx97.theater.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppUserService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(AppUserService.class);
    private final AppUserRepository appUserRepository;
    private final AppUserMapper appUserMapper;

    public List<AppUserDTO> getAllUsers() {
        logger.info("Fetching all users");
        List<AppUser> users = appUserRepository.findAll();
        return users.stream()
                .map(appUserMapper::appUserToAppUserDTO)
                .collect(Collectors.toList());
    }

    public AppUserDTO getUserById(Long id) {
        logger.info("Fetching user with id: {}", id);
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomException("User with id: " + id + " does not exist"));
        return appUserMapper.appUserToAppUserDTO(user);
    }

    public AppUserDTO createUser(AppUserDTO appUserDTO) {
        logger.info("Creating new user: {}", appUserDTO);
        AppUser appUser = appUserMapper.appUserDTOToAppUser(appUserDTO);
        AppUser savedUser = appUserRepository.save(appUser);
        return appUserMapper.appUserToAppUserDTO(savedUser);
    }

    public AppUserDTO updateUser(Long id, AppUserDTO appUserDTO) {
        logger.info("Updating user with id: {}", id);
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new CustomException("User with id: " + id + " does not exist"));

        user.setUsername(appUserDTO.getUsername());
        user.setUser_password(appUserDTO.getUser_password());
        user.setUser_email(appUserDTO.getUser_email());
        user.setRole(appUserMapper.appUserDTOToAppUser(appUserDTO).getRole());

        AppUser updatedUser = appUserRepository.save(user);
        return appUserMapper.appUserToAppUserDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        logger.info("Deleting user with id: {}", id);
        if (!appUserRepository.existsById(id)) {
            throw new CustomException("User with id: " + id + " does not exist");
        }
        appUserRepository.deleteById(id);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        logger.info("LoadUserByUserName: username={}, userId={}", user.getUsername(), user.getUserId());

        return new CustomUserDetails(
                user.getUsername(),
                user.getUser_password(),
                user.getUserId(),
                List.of(new SimpleGrantedAuthority(user.getRole().getRoleName()))
        );
    }

    public AppUser save(AppUser user) {
        return appUserRepository.save(user);
    }
}
