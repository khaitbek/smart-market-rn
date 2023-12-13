
declare module "react-devtools-core" {
  const connectToDevTools: ({ 
    host,
    port
  }: {
    host: string;
    port: number;
  }) => unknown;
  export { connectToDevTools };
}