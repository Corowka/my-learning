using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

[RequireComponent(typeof(BirdController))]
[RequireComponent(typeof(ScoreCounter))]
[RequireComponent(typeof(BirdCollisionDetector))]
public class Bird : MonoBehaviour
{
    private BirdController _controller;
    private ScoreCounter _scoreCounter;
    private BirdCollisionDetector _collisionDetector;

    public event Action GameOver;

    void Awake()
    {
        _controller = GetComponent<BirdController>();
        _scoreCounter = GetComponent<ScoreCounter>();
        _collisionDetector = GetComponent<BirdCollisionDetector>();
    }

    private void OnEnable()
    {
        _collisionDetector.CollisionDetected += ProcessCollision;
    }

    private void OnDisable()
    {
        _collisionDetector.CollisionDetected -= ProcessCollision;
    }

    private void ProcessCollision(IInteractable interactable)
    {
        if (interactable is Pipe || interactable is Ground)
        {
            GameOver?.Invoke();
            Debug.Log("GameOver");
        }
        else if (interactable is ScoreZone)
        {
            _scoreCounter.Add();
        }
    }

    public void Reset()
    {
        _scoreCounter.Reset();
        _controller.Reset();
    }
}
