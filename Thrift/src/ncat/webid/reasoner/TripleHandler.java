package ncat.webid.reasoner;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.thrift.TException;

import org.mindswap.pellet.jena.PelletReasonerFactory;

import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.InfModel;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.reasoner.Reasoner;
import java.io.StringReader;
import java.io.StringWriter;

public class TripleHandler implements ReasoningService.Iface{
	private String OntologyURI;
	
	public TripleHandler(String ou){
		OntologyURI = ou;
	}
	
	@Override
	public String reasoner(String rdf) throws TException {
		OntModel ontologyModel = ModelFactory.createOntologyModel(PelletReasonerFactory.THE_SPEC, null);
		ontologyModel.read(OntologyURI, "N3");
		StringReader str = new StringReader(rdf);
		ontologyModel.read(str, null, "N3");
		Reasoner reasoner = PelletReasonerFactory.theInstance().create();
		//Bind the reasoner to the data model into a new Inferred model 
		InfModel infModel = ModelFactory.createInfModel(reasoner, ontologyModel);
		StringWriter stw = new StringWriter();
		infModel.write(stw, "N3");
		return stw.toString();
	}
}
