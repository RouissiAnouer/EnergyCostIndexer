package Emit.PowerConsult.Dao;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;




public class MeasureValue {
	
	public DBObject getbyone(Double id) throws IOException {
		
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("measurement");
		
		DBCollection table = db.getCollection("measurements");

		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("id", id);
		DBCursor cursor = table.find(searchQuery);
		return cursor.next();    
	 	
	}
	
	public String remove(Double id) throws UnknownHostException {
		
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("measurement");
		
		DBCollection table = db.getCollection("measurements");

		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("id", id);
		DBCursor cursor = table.find(searchQuery);
		table.remove(cursor.next());
		return null;
	}
	
	public List<DBObject> getall() throws IOException {
		
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("measurement");
		
		DBCollection table = db.getCollection("measurements");
		DBCursor cursor = table.find();
		List<DBObject> list = cursor.toArray();
        
		return list;        
	 	
	

}

	public int size() throws IOException {
		int size = 0;
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("measurement");
		
		DBCollection table = db.getCollection("measurements");
		DBCursor cursor = table.find();
		List<DBObject> list = cursor.toArray();
		size = list.size();
		return size;
	}

	public List<DBObject> sizeLimit(int offset, int length) throws IOException {
		MongoClient mongo = new MongoClient( "localhost" , 27017 );
		DB db = mongo.getDB("measurement");
		
		DBCollection table = db.getCollection("measurements");
		
		DBCursor cursor = table.find().limit(length).skip(offset);
		
		List<DBObject> list = cursor.toArray();
		return list;
	}
}
