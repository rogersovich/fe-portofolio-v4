
export const useMinioUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  const minio_base_url = `${runtimeConfig.public.minio_endpoint}/${runtimeConfig.public.minio_bucket}/`

  return minio_base_url
}