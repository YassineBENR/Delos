import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: "sgekyzia",
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: "skxPROhMI7xr6Ylxd8xsoII5Oj5sRSpOV9Cc31BEhBkGKlDMn1f6gApZmyVl7xLu7KF59hEfglOEb3sBNlFidpYdnhMjrwx7W5EMVvOugqgfSGZN1JkR0J8cPuTT23BTIlo8hSt94Z50bkstsJd7YsGvpvrkIseNwGQrv0Pnymgnc6QRwksE",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
