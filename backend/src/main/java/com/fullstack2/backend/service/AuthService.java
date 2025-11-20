package com.fullstack2.backend.service;

import com.fullstack2.backend.dto.AuthRequest;
import com.fullstack2.backend.dto.AuthResponse;
import com.fullstack2.backend.dto.RegisterRequest;
import com.fullstack2.backend.entity.Role;
import com.fullstack2.backend.entity.User;
import com.fullstack2.backend.repository.UserRepository;
import com.fullstack2.backend.security.JwtService;
import com.fullstack2.backend.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       JwtService jwtService,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email ya registrado");
        }

        Role role = request.getRole();
        if (role == null) {
            role = Role.PLAYER; // por defecto
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        User saved = userRepository.save(user);

        UserPrincipal principal = UserPrincipal.fromUser(saved);
        String token = jwtService.generateToken(principal, java.util.Map.of(
                "role", saved.getRole().name(),
                "username", saved.getUsername()
        ));

        return new AuthResponse(token, saved.getUsername(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        // Esto lanza excepción si está mal
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));

        UserPrincipal principal = UserPrincipal.fromUser(user);
        String token = jwtService.generateToken(principal, java.util.Map.of(
                "role", user.getRole().name(),
                "username", user.getUsername()
        ));

        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getRole());
    }
}
