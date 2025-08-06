export default class CollisionChecker {
  checkEntityCollision(entity1, entity2) {
    const collisionLevel =
      entity1.getCollisionLevel() === entity2.getCollisionLevel();

    if (!collisionLevel) {
      return false;
    }

    const entity1HasCircle = entity1.collisionRadius !== undefined;
    const entity2HasCircle = entity2.collisionRadius !== undefined;

    if (entity1HasCircle && entity2HasCircle) {
      const entity1Circle = entity1.getCollisionCircle();
      const entity2Circle = entity2.getCollisionCircle();
      const dx = entity1Circle.x - entity2Circle.x;
      const dy = entity1Circle.y - entity2Circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < entity1Circle.radius + entity2Circle.radius;
    } else if (entity1HasCircle && !entity2HasCircle) {
      const entity1Circle = entity1.getCollisionCircle();
      const entity2Box = entity2.getCollisionBox();
      const closestX = Math.max(
        entity2Box.x,
        Math.min(entity1Circle.x, entity2Box.x + entity2Box.width)
      );
      const closestY = Math.max(
        entity2Box.y,
        Math.min(entity1Circle.y, entity2Box.y + entity2Box.height)
      );
      const dx = entity1Circle.x - closestX;
      const dy = entity1Circle.y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= entity1Circle.radius;
    } else if (!entity1HasCircle && entity2HasCircle) {
      const entity1Box = entity1.getCollisionBox();
      const entity2Circle = entity2.getCollisionCircle();
      const closestX = Math.max(
        entity1Box.x,
        Math.min(entity2Circle.x, entity1Box.x + entity1Box.width)
      );
      const closestY = Math.max(
        entity1Box.y,
        Math.min(entity2Circle.y, entity1Box.y + entity1Box.height)
      );
      const dx = entity2Circle.x - closestX;
      const dy = entity2Circle.y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= entity2Circle.radius;
    } else {
      const entity1Box = entity1.getCollisionBox();
      const entity2Box = entity2.getCollisionBox();
      return (
        entity1Box.x < entity2Box.x + entity2Box.width &&
        entity1Box.x + entity1Box.width > entity2Box.x &&
        entity1Box.y < entity2Box.y + entity2Box.height &&
        entity1Box.y + entity1Box.height > entity2Box.y
      );
    }
  }
}
