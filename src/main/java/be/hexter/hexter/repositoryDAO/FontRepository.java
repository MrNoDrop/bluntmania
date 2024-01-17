package be.hexter.hexter.repositoryDAO;

import java.io.File;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import be.hexter.hexter.model.Font;

@Repository
public interface FontRepository extends CrudRepository<Font, Long> {

    File findFontByName(String name);
}
