package ncat.webid.reasoner;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Properties;

public class Server{
	public static void main(String[] args){
		try {
			Properties prop = new Properties();
			String propFileName = "config.properties";
			
			InputStream inputStream = new Server().getClass().getClassLoader().getResourceAsStream(propFileName);
	
			if (inputStream != null) {
				prop.load(inputStream);
			} 
			else {
				throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
			}
			
			String ontoURI = prop.getProperty("ontologyURI");
			int useSecure = Integer.parseInt(prop.getProperty("useSecure"));
			int port = Integer.parseInt(prop.getProperty("port"));
			TripleHandler tph = new TripleHandler(ontoURI);
			ReasoningService.Processor processor = new ReasoningService.Processor(tph);
			if(useSecure == 1){
				Thread t = new Thread(new SecureServerRun(port, processor));
				t.start();
			}
			else{
				Thread t = new Thread(new ServerRun(port, processor));
				t.start();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
