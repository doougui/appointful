import { app } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
