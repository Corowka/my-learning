using System.Collections.Generic;
using UnityEngine;

public class ObjectPool : MonoBehaviour
{
    [SerializeField] private Transform _container;
    [SerializeField] private GameObject _prefab;

    private Queue<GameObject> _pool;

    void Awake()
    {
        _pool = new Queue<GameObject>();
    }

    public GameObject GetObject()
    {
        if (_pool.Count == 0)
        {
            GameObject newPipe = Instantiate(_prefab, _container);
            newPipe.gameObject.SetActive(true);
            return newPipe;
        }
        GameObject pipe = _pool.Dequeue();
        pipe.gameObject.SetActive(true);
        return pipe;
    }

    public void PutObject(GameObject pipe)
    {
        _pool.Enqueue(pipe);
        pipe.gameObject.SetActive(false);
    }

    public void Reset()
    {
        _pool.Clear();
        foreach (Transform child in _container.transform)
        {
            Destroy(child.gameObject);
        }
    }
}