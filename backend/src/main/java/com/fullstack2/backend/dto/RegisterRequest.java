package com.fullstack2.backend.dto;

import com.fullstack2.backend.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Role role; // DM o PLAYER normalmente, ADMIN lo podremos crear a mano
}
