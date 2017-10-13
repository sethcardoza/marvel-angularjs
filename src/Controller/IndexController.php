<?php
namespace App\Controller;

/**
 * Index controller
 *
 * This controller will render views from Template/Index/
 *
 */
class IndexController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {

    }
}
