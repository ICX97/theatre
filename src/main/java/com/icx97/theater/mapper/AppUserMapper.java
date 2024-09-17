package com.icx97.theater.mapper;

import com.icx97.theater.dto.AppUserDTO;
import com.icx97.theater.model.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AppUserMapper {
    AppUserMapper INSTANCE = Mappers.getMapper(AppUserMapper.class);

    @Mapping(source = "role.roleId", target = "roleId")
    AppUserDTO appUserToAppUserDTO(AppUser appUser);

    @Mapping(source = "roleId", target = "role.roleId")
    AppUser appUserDTOToAppUser(AppUserDTO appUserDTO);
}