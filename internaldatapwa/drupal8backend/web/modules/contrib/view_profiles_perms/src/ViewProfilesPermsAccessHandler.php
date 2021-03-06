<?php

namespace Drupal\view_profiles_perms;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\user\UserAccessControlHandler;

/**
 * Defines an access control handler for the user entity type.
 */
class ViewProfilesPermsAccessHandler extends UserAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    // Parent class allowing access takes precedence.
    /** @var \Drupal\user\UserInterface $entity*/
    $access = parent::checkAccess($entity, $operation, $account);
    if ($access->isAllowed()) {
      return $access;
    }
    // Respect the conditions on view of the parent class.
    // @see \Drupal\user\UserAccessControlHandler::checkAccess()
    if ($operation == 'view' && $entity->isActive() && ($account->id() !== $entity->id())) {
      foreach ($entity->getRoles(TRUE) as $role) {
        $result = AccessResult::allowedIfHasPermission($account, "access $role profiles");
        if ($result->isAllowed()) {
          return $result;
        }
      }
    }
    return $access;
  }

}
