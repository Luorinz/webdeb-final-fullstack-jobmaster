package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import lombok.Data;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-9
 */
@Data
public class APIResponse {
    private Integer count;
    private List<Job> results;
}
