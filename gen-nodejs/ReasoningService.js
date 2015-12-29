//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./reasoning_types');
//HELPER FUNCTIONS AND STRUCTURES

ReasoningService_reasoner_args = function(args) {
  this.rdf = null;
  if (args) {
    if (args.rdf !== undefined) {
      this.rdf = args.rdf;
    }
  }
};
ReasoningService_reasoner_args.prototype = {};
ReasoningService_reasoner_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.rdf = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ReasoningService_reasoner_args.prototype.write = function(output) {
  output.writeStructBegin('ReasoningService_reasoner_args');
  if (this.rdf !== null && this.rdf !== undefined) {
    output.writeFieldBegin('rdf', Thrift.Type.STRING, 1);
    output.writeString(this.rdf);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ReasoningService_reasoner_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
ReasoningService_reasoner_result.prototype = {};
ReasoningService_reasoner_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ReasoningService_reasoner_result.prototype.write = function(output) {
  output.writeStructBegin('ReasoningService_reasoner_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ReasoningServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
ReasoningServiceClient.prototype = {};
ReasoningServiceClient.prototype.reasoner = function(rdf, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_reasoner(rdf);
};

ReasoningServiceClient.prototype.send_reasoner = function(rdf) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('reasoner', Thrift.MessageType.CALL, this.seqid);
  var args = new ReasoningService_reasoner_args();
  args.rdf = rdf;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ReasoningServiceClient.prototype.recv_reasoner = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new ReasoningService_reasoner_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('reasoner failed: unknown result');
};
ReasoningServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
ReasoningServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

ReasoningServiceProcessor.prototype.process_reasoner = function(seqid, input, output) {
  var args = new ReasoningService_reasoner_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.reasoner(args.rdf, function (err, result) {
    var result = new ReasoningService_reasoner_result((err != null ? err : {success: result}));
    output.writeMessageBegin("reasoner", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

