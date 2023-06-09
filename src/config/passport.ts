import passportJWT from 'passport-jwt';
import { PassportStatic } from 'passport';
import User from '../models/User';

const secretKey = process.env.PASSPORT_SECRET;

export function configurePassport(passport: PassportStatic) {
    const opts = {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey
    };
    
    passport.use(new passportJWT.Strategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.userId);
    
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
}
