package be.hexter.hexter.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import be.hexter.hexter.service.FontService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/font")
public class FontController {

    @Autowired
    private FontService fontService;

    @GetMapping("/{name}")
    @ResponseBody
    public String getFontByName(@PathVariable String name) {
        return null;
    }
}
