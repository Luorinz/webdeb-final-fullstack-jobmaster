package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import lombok.Data;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-18
 */
@Data
public class Location {
    private String display_name;
    private List<String> area;
}
