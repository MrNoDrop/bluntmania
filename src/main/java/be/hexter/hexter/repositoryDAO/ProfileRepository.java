package be.hexter.hexter.repositoryDAO;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import be.hexter.hexter.model.Profile;

@Repository
public interface ProfileRepository extends CrudRepository<Profile, Long> {
    @Query("SELECT profile FROM Profile AS profile INNER JOIN profile.user AS user WHERE user.id = ?1")
    Profile findByUserID(long id);
}
