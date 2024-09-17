package com.icx97.theater.mapper;

import com.icx97.theater.dto.RoleDTO;
import com.icx97.theater.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoleMapper {
    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO roleToRoleDTO(Role role);

    Role roleDTOToRole(RoleDTO roleDTO);
}