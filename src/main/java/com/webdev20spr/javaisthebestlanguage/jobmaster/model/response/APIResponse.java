package com.webdev20spr.javaisthebestlanguage.jobmaster.model.response;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
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
