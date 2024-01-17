package be.hexter.hexter.service.implementation;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import be.hexter.hexter.repositoryDAO.FontRepository;
import be.hexter.hexter.service.FontService;

@Repository
public class FontServiceImplementation implements FontService {

    @Autowired
    private FontRepository fontRepository;

    @Override
    public File findFontByName(String name) {
        return fontRepository.findFontByName(name);
    }

}
