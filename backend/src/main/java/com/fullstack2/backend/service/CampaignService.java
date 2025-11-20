package com.fullstack2.backend.service;

import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.User;
import com.fullstack2.backend.repository.CampaignRepository;
import com.fullstack2.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public CampaignService(CampaignRepository campaignRepository,
                           UserRepository userRepository) {
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    }

    private String generateInviteCode() {
        byte[] randomBytes = new byte[6];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public Campaign createCampaign(String name, String description) {
        User dm = getCurrentUser();

        Campaign campaign = Campaign.builder()
                .name(name)
                .description(description)
                .dm(dm)
                .inviteCode(generateInviteCode())
                .build();

        return campaignRepository.save(campaign);
    }

    public List<Campaign> getMyCampaignsAsDm() {
        User dm = getCurrentUser();
        return campaignRepository.findByDm(dm);
    }

    public Campaign getById(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaña no encontrada"));
    }

    // 🧩 Player se une a campaña usando inviteCode
    public Campaign joinCampaignByInviteCode(String inviteCode) {
        User current = getCurrentUser();

        Campaign campaign = campaignRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new RuntimeException("Código de invitación inválido"));

        if (!campaign.getPlayers().contains(current)) {
            campaign.getPlayers().add(current);
        }

        return campaignRepository.save(campaign);
    }
}
