package mypack.utilities;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Utilities {
	
     public static Object stringToJSONObjectConverter(String inputString) {
         try {
             // Initialize ObjectMapper from Jackson
             ObjectMapper objectMapper = new ObjectMapper();
             
             // Convert the string to JSON
             Object json = objectMapper.readValue(inputString, Object.class);
             
             // Convert JSON object back to string
             return objectMapper.writeValueAsString(json);
         } catch (Exception e) {
             e.printStackTrace();
             return "{\"error\": \"Failed to convert string to JSON\"}";
         }
     }
     
    
    
}
