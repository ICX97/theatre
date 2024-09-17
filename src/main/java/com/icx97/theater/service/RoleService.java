package com.icx97.theater.service;

import com.icx97.theater.dto.RoleDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.RoleMapper;
import com.icx97.theater.model.Role;
import com.icx97.theater.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public List<RoleDTO> getAllRoles() {
        logger.info("Fetching all roles");
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(roleMapper::roleToRoleDTO)
                .collect(Collectors.toList());
    }

    public RoleDTO getRoleById(Long id) {
        logger.info("Fetching role with id: {}", id);
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new CustomException("Role with id: " + id + " does not exist"));
        return roleMapper.roleToRoleDTO(role);
    }

    public RoleDTO createRole(RoleDTO roleDTO) {
        logger.info("Creating new role: {}", roleDTO);
        Role role = roleMapper.roleDTOToRole(roleDTO);
        Role savedRole = roleRepository.save(role);
        return roleMapper.roleToRoleDTO(savedRole);
    }

    public RoleDTO updateRole(Long id, RoleDTO roleDTO) {
        logger.info("Updating role with id: {}", id);
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new CustomException("Role with id: " + id + " does not exist"));

        role.setRoleName(roleDTO.getRoleName());

        Role updatedRole = roleRepository.save(role);
        return roleMapper.roleToRoleDTO(updatedRole);
    }

    public void deleteRole(Long id) {
        logger.info("Deleting role with id: {}", id);
        if (!roleRepository.existsById(id)) {
            throw new CustomException("Role with id: " + id + " does not exist");
        }
        roleRepository.deleteById(id);
    }
}