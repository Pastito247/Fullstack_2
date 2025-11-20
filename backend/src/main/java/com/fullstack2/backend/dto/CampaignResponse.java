package com.fullstack2.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CampaignResponse {

    private Long id;
    private String name;
    private String description;
    private String inviteCode;
    private String dmUsername;
}
