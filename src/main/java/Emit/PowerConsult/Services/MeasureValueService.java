package Emit.PowerConsult.Services;

import java.io.IOException;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


import com.mongodb.DBObject;

import Emit.PowerConsult.Dao.MeasureValue;

@Path("measure")
public class MeasureValueService {
	
	private MeasureValue measure = new MeasureValue();

	@Path("getbyone")	
	@GET
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	public DBObject getbyonews(@QueryParam("id") Double id) throws IOException{
		return measure.getbyone(id);
	}
	
	
	
	@Path("getall")	
	@GET
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	public List<DBObject> getallws() throws IOException{
		return measure.getall();
	}
	
	@Path("remove")
	@GET
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	public String removews(@QueryParam("id") Double id) throws IOException {
		return measure.remove(id);
	}
	
	@Path("size")
	@GET
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	public int sizews() throws IOException {
		return measure.size();
	}
	
	@Path("limit")
	@GET
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	public List<DBObject> sizeLimit(@QueryParam("offset") int offset,@QueryParam("length") int length) throws IOException {
		return measure.sizeLimit(offset,length);
	}
	
}
