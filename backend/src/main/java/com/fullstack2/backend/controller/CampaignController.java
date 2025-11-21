package com.fullstack2.backend.controller;

import com.fullstack2.backend.dto.CampaignCreateRequest;
import com.fullstack2.backend.dto.CampaignResponse;
import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.service.CampaignService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campaigns")
public class CampaignController {

        private final CampaignService campaignService;

        public CampaignController(CampaignService campaignService) {
                this.campaignService = campaignService;
        }

        // Crear campaña (por ahora cualquier usuario logueado,
        // luego si quieres lo restringimos a ROLE_DM)
        @PreAuthorize("hasRole('DM') or hasRole('ADMIN')")
        @PostMapping
        public ResponseEntity<CampaignResponse> createCampaign(
                        @RequestBody CampaignCreateRequest request) {

                Campaign campaign = campaignService.createCampaign(
                                request.getName(),
                                request.getDescription());

                CampaignResponse response = CampaignResponse.builder()
                                .id(campaign.getId())
                                .name(campaign.getName())
                                .description(campaign.getDescription())
                                .inviteCode(campaign.getInviteCode())
                                .dmUsername(campaign.getDm().getUsername())
                                .build();

                return ResponseEntity.ok(response);
        }

        // Listar campañas donde soy DM
        @GetMapping("/mine")
        public ResponseEntity<List<CampaignResponse>> getMyCampaigns() {
                List<CampaignResponse> list = campaignService.getMyCampaignsAsDm().stream()
                                .map(c -> CampaignResponse.builder()
                                                .id(c.getId())
                                                .name(c.getName())
                                                .description(c.getDescription())
                                                .inviteCode(c.getInviteCode())
                                                .dmUsername(c.getDm().getUsername())
                                                .build())
                                .toList();

                return ResponseEntity.ok(list);
        }

        // Obtener campaña por id (después podemos controlar visibilidad)
        @GetMapping("/{id}")
        public ResponseEntity<CampaignResponse> getById(@PathVariable Long id) {
                Campaign c = campaignService.getById(id);

                CampaignResponse response = CampaignResponse.builder()
                                .id(c.getId())
                                .name(c.getName())
                                .description(c.getDescription())
                                .inviteCode(c.getInviteCode())
                                .dmUsername(c.getDm().getUsername())
                                .build();

                return ResponseEntity.ok(response);
        }

        // Player se une a campaña con inviteCode
        @PostMapping("/join/{inviteCode}")
        public ResponseEntity<CampaignResponse> joinCampaign(@PathVariable String inviteCode) {
                Campaign campaign = campaignService.joinCampaignByInviteCode(inviteCode);

                CampaignResponse response = CampaignResponse.builder()
                                .id(campaign.getId())
                                .name(campaign.getName())
                                .description(campaign.getDescription())
                                .inviteCode(campaign.getInviteCode())
                                .dmUsername(campaign.getDm().getUsername())
                                .build();

                return ResponseEntity.ok(response);
        }

        @PreAuthorize("hasRole('ADMIN')")
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
                campaignService.deleteCampaign(id);
                return ResponseEntity.noContent().build();
        }

}
