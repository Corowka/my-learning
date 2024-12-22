using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipesGenerator : MonoBehaviour
{
    [SerializeField] private float _delay;
    [SerializeField] private float _loverBound;
    [SerializeField] private float _upperBound;
    [SerializeField] private ObjectPool _pool;

    private void Start()
    {
        StartCoroutine(GeneratePipes());
    }

    private IEnumerator GeneratePipes()
    {
        var wait = new WaitForSeconds(_delay);
        while (enabled)
        {
            Spawn();
            Debug.Log("Spawn");
            yield return wait;
        }
    }

    private void Spawn()
    {
        float spawnPositionY = Random.Range(_upperBound, _loverBound);
        Vector3 spawnPoint = new Vector3(transform.position.x, spawnPositionY, transform.position.z);
        GameObject pipe = _pool.GetObject();
        pipe.transform.position = spawnPoint;
    }

    public void Reset()
    {
        _pool.Reset();
    }
}
