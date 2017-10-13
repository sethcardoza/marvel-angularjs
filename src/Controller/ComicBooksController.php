<?php
namespace App\Controller;

use SethCardoza\Marvel\Events;

/**
 * ComicBooks controller
 *
 * This controller will render views from Template/Comics/
 *
 */
class ComicBooksController extends AppController
{
    public $Events;
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');

        $this->Events = new Events();
    }

    public function events()
    {
        $params = $this->getParams();

        $events = $this->Events->get($params);

        $this->set(compact('events'));
        $this->set('_serialize', ['events']);
    }

    public function eventsAll()
    {
        $events = $this->Events->getAll();

        $this->set(compact('events'));
        $this->set('_serialize', ['events']);
    }

    private function getParams()
    {
        $limit = $this->request->getQuery('limit');
        $offset = $this->request->getQuery('offset');

        $params = [
            'limit' => $limit ? $limit : 10,
            'offset' => $offset ? $offset : 0
        ];

        return $params;
    }
}
