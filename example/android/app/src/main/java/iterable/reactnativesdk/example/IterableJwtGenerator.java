package com.iterable;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Base64.Encoder;

/**
* Utility class to generate JWTs for use with the Iterable API
*
* @author engineering@iterable.com
*/
public class IterableJwtGenerator {
   static Encoder encoder = Base64.getUrlEncoder().withoutPadding();

   private static final String algorithm = "HmacSHA256";

   // Iterable enforces a 1-year maximum token lifetime
   private static final Duration maxTokenLifetime = Duration.ofDays(365);

   private static long millisToSeconds(long millis) {
       return millis / 1000;
   }

   private static final String encodedHeader = encoder.encodeToString(
       "{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes(StandardCharsets.UTF_8)
   );

   /**
    * Generates a JWT from the provided secret, header, and payload. Does not
    * validate the header or payload.
    *
    * @param secret  Your organization's shared secret with Iterable
    * @param payload The JSON payload
    *
    * @return a signed JWT
    */
   public static String generateToken(String secret, String payload) {
       try {
           String encodedPayload = encoder.encodeToString(
               payload.getBytes(StandardCharsets.UTF_8)
           );
           String encodedHeaderAndPayload = encodedHeader + "." + encodedPayload;

           // HMAC setup
           Mac hmac = Mac.getInstance(algorithm);
           SecretKeySpec keySpec = new SecretKeySpec(
               secret.getBytes(StandardCharsets.UTF_8), algorithm
           );
           hmac.init(keySpec);

           String signature = encoder.encodeToString(
               hmac.doFinal(
                   encodedHeaderAndPayload.getBytes(StandardCharsets.UTF_8)
               )
           );

           return encodedHeaderAndPayload + "." + signature;

       } catch (Exception e) {
           throw new RuntimeException(e.getMessage());
       }
   }

   /**
    * Generates a JWT (issued now, expires after the provided duration).
    *
    * @param secret   Your organization's shared secret with Iterable.
    * @param duration The token's expiration time. Up to one year.
    * @param email    The email to included in the token, or null.
    * @param userId   The userId to include in the token, or null.
    *
    * @return A JWT string
    */
   public static String generateToken(
       String secret, Duration duration, String email, String userId) {

       if (duration.compareTo(maxTokenLifetime) > 0)
           throw new IllegalArgumentException(
               "Duration must be one year or less."
           );

       if ((userId != null && email != null) || (userId == null && email == null))
           throw new IllegalArgumentException(
               "The token must include a userId or email, but not both."
           );

       long now = millisToSeconds(System.currentTimeMillis());

       String payload;
       if (userId != null)
           payload = String.format(
               "{ \"userId\": \"%s\", \"iat\": %d, \"exp\": %d }",
               userId, now, now + millisToSeconds(duration.toMillis())
           );
       else
           payload = String.format(
               "{ \"email\": \"%s\", \"iat\": %d, \"exp\": %d }",
               email, now, now + millisToSeconds(duration.toMillis())
           );

       return generateToken(secret, payload);
   }
}
