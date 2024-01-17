import { connect } from 'amqplib/callback_api.js';

export default connect(`amqp://localhost`, (err, connection)=>{
    if(err){
        console.log(err);
    }
    connection.createChannel((err, channel)=>{
        if (err) {
            throw err
        }
        let queueName = "invitees";

        channel.assertQueue(queueName, {
            durable: false
        });

        channel.consume(queueName, (msg)=>{
            console.log(`Received : ${msg.content.toString()}`);
            channel.ack(msg);
        } )

        setTimeout(()=>{
            connection.close();
        }, 1000)
    })
})