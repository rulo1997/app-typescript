import { Queue } from 'bullmq';

import redisClient from '../config/redis';

const notificationQueue = new Queue('notifications', {
    connection: redisClient.duplicate(),
});

export default notificationQueue;