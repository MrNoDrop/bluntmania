package be.hexter.hexter.service;

import be.hexter.hexter.model.Profile;
import be.hexter.hexter.model.User;
import be.hexter.hexter.service.exception.ProfileRegisteredException;

public interface ProfileService {

    public Profile registerProfile(Profile profile) throws ProfileRegisteredException;

    public Profile findByUser(User user);
}
