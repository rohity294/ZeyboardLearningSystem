package mypack.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Service
public class OpenAIServiceImpl implements OpenAIService{
	
	private static final String API_URL = "https://api.openai.com/v1/chat/completions";
	private static final String API_KEY = System.getenv("OPENAI_APIKEY");
	
	public String convertDecimalToRomanFrom1To3(int num) {
		String result = "Invalid Input:Must be an integer in range 1 to 3, both inclusive";
		if(num>0 && num<=3) {
			result = "";
			for(int i=1; i<=num; i++) {
				result = result + "I";
			}
		}
		return result;
	}
	
	@Override
	public String consumePromptAndFetchAllOpenApiData(String prompt) {
		 System.out.println(prompt);
				
		 CloseableHttpClient httpClient = HttpClients.createDefault();
		 String responseBody = "";

		    try {
		        HttpPost request = new HttpPost(API_URL);
		        request.setHeader("Content-Type", "application/json");
		        request.setHeader("Authorization", "Bearer " + API_KEY);
		        


		        
		        String model = "gpt-3.5-turbo";
		        Message message1 = new Message("system","You are a customer service agent providing finanical advice");
		        Message message2 = new Message("user",prompt);
		        Message[] messages = {message1, message2};
		        int max_tokens = 50;
		        
		        RequestBody requestBody = new RequestBody(model,messages,max_tokens);
		        
		        ObjectMapper objectMapper = new ObjectMapper();
		        String jsonRequestBody = objectMapper.writeValueAsString(requestBody);
		        //System.out.println("#####################");
		        //System.out.println(jsonRequestBody);
		        
		        StringEntity entity = new StringEntity(jsonRequestBody);
		        request.setEntity(entity);

		        HttpResponse response = httpClient.execute(request);
		        HttpEntity responseEntity = response.getEntity();
		        
		        if (responseEntity != null) {
		        	//System.out.println("**********************************");
		            responseBody = EntityUtils.toString(responseEntity);
		            //System.out.println(responseBody);
		        }
		    } catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ClientProtocolException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
		        try {
					httpClient.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    }
		    
		    //return "Placeholder data from OpenAI";
		    return responseBody;

	}
	
	static class RequestBody {
	    private String model;
	    private Message[] messages;
	    private int max_tokens;

	    public RequestBody(String model, Message[] messages, int max_tokens) {
	        this.model = model;
	        this.messages = messages;
	        this.max_tokens = max_tokens;
	    }

		public String getModel() {
			return model;
		}

		public void setModel(String model) {
			this.model = model;
		}

		public Message[] getMessages() {
			return messages;
		}

		public void setMessages(Message[] messages) {
			this.messages = messages;
		}

		public int getMax_tokens() {
			return max_tokens;
		}

		public void setMax_tokens(int max_tokens) {
			this.max_tokens = max_tokens;
		}

	    
	}
	
	static class Message{
		private String role;
		private String content;
		public Message(String role, String content) {
			this.role = role;
			this.content = content;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		
	}
	
	


}





