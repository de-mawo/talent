import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma.js";

const extractEmail = (profile) => {
  if (profile.emails && profile.emails.length > 0) {
    return profile.emails[0].value;
  } else {
    return null;
  }
};

const extractImage = (profile) => {
  if (profile.photos && profile.photos.length > 0) {
    return profile.photos[0].value;
  } else {
    return null;
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      //   passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("This is a profile =>", profile);

      const email = extractEmail(profile);
      const image = extractImage(profile);

      try {
        const userExist = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });

        if (!userExist) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              image,
              googleId: profile.id,
            },
          });
          done(null, newUser);
        } else {
          done(null, userExist);
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, checkUser);
  } catch (error) {
    done(error);
  }
});

export default passport;
