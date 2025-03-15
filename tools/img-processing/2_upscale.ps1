# PowerShell script to upscale images using realesrgan-ncnn-vulkan

if (Test-Path "./2_after_upscale") {
  Remove-Item -Path "./2_after_upscale" -Recurse -Force
}
New-Item -Path "./2_after_upscale/cards" -ItemType Directory

./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards -o ./2_after_upscale/cards -n realesrgan-x4plus-anime

./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/8.png -o ./2_after_upscale/cards/8.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/9.png -o ./2_after_upscale/cards/9.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/11.png -o ./2_after_upscale/cards/11.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/15.png -o ./2_after_upscale/cards/15.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/17.png -o ./2_after_upscale/cards/17.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/19.png -o ./2_after_upscale/cards/19.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/20.png -o ./2_after_upscale/cards/20.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/23.png -o ./2_after_upscale/cards/23.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/32.png -o ./2_after_upscale/cards/32.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/33.png -o ./2_after_upscale/cards/33.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/40.png -o ./2_after_upscale/cards/40.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/41.png -o ./2_after_upscale/cards/41.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/51.png -o ./2_after_upscale/cards/51.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/61.png -o ./2_after_upscale/cards/61.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/74.png -o ./2_after_upscale/cards/74.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/79.png -o ./2_after_upscale/cards/79.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/81.png -o ./2_after_upscale/cards/81.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/84.png -o ./2_after_upscale/cards/84.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/87.png -o ./2_after_upscale/cards/87.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/cards/99.png -o ./2_after_upscale/cards/99.png -n realesrgan-x4plus

Copy-Item -Path "./1_after_crop/explosion.png" -Destination "./2_after_upscale/"
Copy-Item -Path "./1_after_crop/firework.png" -Destination "./2_after_upscale/"

./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/res_1.png -o ./2_after_upscale/res_1.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/res_2.png -o ./2_after_upscale/res_2.png -n realesrgan-x4plus
./realesrgan-ncnn-vulkan-windows/realesrgan-ncnn-vulkan.exe -i ./1_after_crop/res_3.png -o ./2_after_upscale/res_3.png -n realesrgan-x4plus

pause

# Usage: realesrgan-ncnn-vulkan -i infile -o outfile [options]...
#   -h                   show this help
#   -i input-path        input image path (jpg/png/webp) or directory
#   -o output-path       output image path (jpg/png/webp) or directory
#   -s scale             upscale ratio (can be 2, 3, 4. default=4)
#   -t tile-size         tile size (>=32/0=auto, default=0) can be 0,0,0 for multi-gpu
#   -m model-path        folder path to the pre-trained models. default=models
#   -n model-name        model name (default=realesr-animevideov3, can be realesr-animevideov3 | realesrgan-x4plus | realesrgan-x4plus-anime | realesrnet-x4plus)
#   -g gpu-id            gpu device to use (default=auto) can be 0,1,2 for multi-gpu
#   -j load:proc:save    thread count for load/proc/save (default=1:2:2) can be 1:2,2,2:2 for multi-gpu
#   -x                   enable tta mode
#   -f format            output image format (jpg/png/webp, default=ext/png)
#   -v                   verbose output
