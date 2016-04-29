package ncat.webid.reasoner;

import org.apache.thrift.server.TServer.Args;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;

public class ServerRun implements Runnable{
	TServerTransport serverTransport;
	TServer server;
	
	public ServerRun(int port, ReasoningService.Processor p){
		try {
			serverTransport = new TServerSocket(port);
			server = new TSimpleServer(new Args(serverTransport).processor(p));
			 // Use this for a multithreaded server
			 // server = new TThreadPoolServer(new TThreadPoolServer.Args(serverTransport).processor(processor));
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
