import { connect } from 'amqplib/callback_api.js';

const publish = (customerId)=>connect(`amqp://localhost`, (err, connection)=>{
    if(err){
        console.log(err);
    }
    connection.createChannel((err, channel)=>{
        if (err) {
            throw err
        }
        let queueName = "invitees";
        // message = "The is an invitee";
        let message = `Customer with customer Id ${customerId} is an invitee`;

        channel.assertQueue(queueName, {
            durable: false
        });

        channel.sendToQueue(queueName, Buffer.from(message));
        setTimeout(()=>{
            connection.close();
        }, 1000)
    })
})

export default publish;