
export const useMinioUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  const minio_base_url = `http://${runtimeConfig.public.minio_endpoint}/${runtimeConfig.public.minio_bucket}/`

  return minio_base_url
}