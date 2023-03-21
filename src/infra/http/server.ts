import { app } from './app';

const PORT = 3333;

app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
