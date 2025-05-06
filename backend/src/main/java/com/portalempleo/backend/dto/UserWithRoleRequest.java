package com.portalempleo.backend.dto;

import com.portalempleo.backend.model.Admin;
import com.portalempleo.backend.model.Candidate;
import com.portalempleo.backend.model.Company;
import com.portalempleo.backend.model.User;
import lombok.Data;

@Data
public class UserWithRoleRequest {

    private User user;

    private Object roleData;

}
