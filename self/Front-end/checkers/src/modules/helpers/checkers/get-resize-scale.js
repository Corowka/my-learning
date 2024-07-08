export const getSpriteResizeScale = (scene, spriteId, aimSize) => {
  const spriteSize = scene.textures.get(spriteId).getSourceImage().height;
  const scale = aimSize / spriteSize;
  return scale;
};
