package com.fullstack2.backend.dto;

import lombok.Data;

@Data
public class CampaignCreateRequest {
    private String name;
    private String description;
}
