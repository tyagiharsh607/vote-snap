export const redisConnection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
};
export const defaultQueueOptions = {
    removeOnComplete: {
        count: 20,
        age: 3600,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000,
    },
    removeOnFail: false,
};
