package be.hexter.hexter.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import be.hexter.hexter.model.Profile;
import be.hexter.hexter.model.User;
import be.hexter.hexter.repositoryDAO.ProfileRepository;
import be.hexter.hexter.service.ProfileService;
import be.hexter.hexter.service.exception.ProfileRegisteredException;

@Service
public class ProfileServiceImplementation implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Profile registerProfile(Profile profile) throws ProfileRegisteredException {
        return profileRepository.save(profile);

    }

    @Override
    public Profile findByUser(User user) {
        return profileRepository.findByUserID(user.getId());
    }
}
