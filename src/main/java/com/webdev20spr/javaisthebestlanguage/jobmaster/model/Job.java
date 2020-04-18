package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.swing.plaf.ProgressBarUI;
import java.util.Date;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@Data
@Document(collection = "jobs")
public class Job {
    @Id
    private String id;
    private String title;
    private Date createTime;
    private String description;



}
