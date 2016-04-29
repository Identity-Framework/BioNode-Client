package ncat.webid.reasoner;

import org.apache.thrift.server.TServer.Args;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TSSLTransportFactory;
import org.apache.thrift.transport.TSSLTransportFactory.TSSLTransportParameters;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;

public class SecureServerRun implements Runnable{

	TSSLTransportParameters params;
	TServerTransport serverTransport;
	TServer server;
	
	public SecureServerRun(int port, ReasoningService.Processor p){
		params = new TSSLTransportParameters();
		params.setKeyStore("../../lib/java/test/.keystore", "thrift", null, null);
		try {
			serverTransport = TSSLTransportFactory.getServerSocket(port, 0, null, params);
			server = new TSimpleServer(new Args(serverTransport).processor(p));
		} catch (TTransportException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	public void run() {
		server.serve();
		
	}

}
