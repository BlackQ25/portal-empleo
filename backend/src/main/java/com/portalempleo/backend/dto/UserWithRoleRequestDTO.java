package com.portalempleo.backend.dto;

import com.portalempleo.backend.model.User;
import lombok.Data;

@Data
public class UserWithRoleRequestDTO {

    private User user;

    private Object roleData;

}
