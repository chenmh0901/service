const Config = () => ({
  QNY_ACCESS_KEY: process.env.QNY_ACCESS_KEY,
  QNY_SECRET_KEY: process.env.QNY_SECRET_KEY,
  QNY_BUCKET: process.env.QNY_BUCKET,
  DATABASE_URL: process.env.DATABASE_URL,
})

export default Config;
